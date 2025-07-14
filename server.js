const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3001; // 前端可以用 3000，后端用 3001

app.use(cors());

app.get('/api/query-tokens', async (req, res) => {
  const clickhouseUrl = 'http://localhost:8123';
  const { windowSize = 'Day', start, end } = req.query;

  let startDate = start ? `${start} 00:00:00` : '';
  let endDate = '';
  if (end) {
    const endObj = new Date(end);
    endObj.setDate(endObj.getDate() + 1);
    endDate = endObj.toISOString().slice(0, 10) + ' 00:00:00';
  }

  const sql = `
  SELECT
    toStartOfMinute(time) AS period,
    JSONExtractString(data, 'model') AS model,
    JSONExtractString(data, 'type') AS data_type,
    SUM(JSONExtractInt(data, 'tokens')) AS total_tokens
  FROM om_events
  WHERE type = 'prompt'
    ${start && end ? `AND time >= '${startDate}' AND time < '${endDate}'` : ''}
  GROUP BY period, model, data_type
  ORDER BY period ASC, model, data_type
`;

  try {
    const response = await axios.post(
      `${clickhouseUrl}/?database=openmeter`, // 注意 database 用 openmeter
      sql,
      {
        headers: { 'Content-Type': 'text/plain' },
        responseType: 'text',
        auth: {
          username: 'default',
          password: 'default'
        }
      }
    );
    console.log('ClickHouse 原始返回数据:', response.data);

    // 解析 ClickHouse 返回的 TSV 格式
    const lines = response.data.trim().split('\n');
    const result = lines.map(line => {
      const arr = line.split('\t');
      console.log('解析每一行:', arr); // 新增
      const [period, model, data_type, total_tokens] = arr;
      return { period, model, data_type, total_tokens: Number(total_tokens) };
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'ClickHouse query failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});