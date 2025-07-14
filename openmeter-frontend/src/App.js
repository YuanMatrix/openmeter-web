import React, { useEffect, useState } from 'react';
import { Table, Button, Select, DatePicker } from 'antd';
import { Column } from '@ant-design/charts';
const { RangePicker } = DatePicker;

function App() {
  const [windowSize, setWindowSize] = useState('Day');
  const [dateRange, setDateRange] = useState([]);
  const [filterModel, setFilterModel] = useState(undefined);
  const [filterType, setFilterType] = useState(undefined);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTokens = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        windowSize,
        start: dateRange[0]?.format('YYYY-MM-DD') || '',
        end: dateRange[1]?.format('YYYY-MM-DD') || '',
        model: filterModel || '',
        type: filterType || ''
      });
      const res = await fetch(`http://localhost:3001/api/query-tokens?${params}`);
      const json = await res.json();
      setData(Array.isArray(json) ? json : []);
    } catch (err) {
      console.error('请求出错:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTokens();
    // eslint-disable-next-line
  }, [windowSize, dateRange, filterModel, filterType]);

  const modelOptions = Array.from(new Set(data.map(item => item.model)));
  const typeOptions = Array.from(new Set(data.map(item => item.data_type)));

  const columns = [
    { title: 'Model', dataIndex: 'model', key: 'model', sorter: (a, b) => a.model.localeCompare(b.model), align: 'center', width: 120 },
    { title: 'Type', dataIndex: 'data_type', key: 'data_type', sorter: (a, b) => a.data_type.localeCompare(b.data_type), align: 'center', width: 120 },
    { title: 'Total Tokens', dataIndex: 'total_tokens', key: 'total_tokens', sorter: (a, b) => a.total_tokens - b.total_tokens, align: 'center', width: 150 },
  ];

  const filteredData = data.filter(row =>
    (filterModel ? row.model === filterModel : true) &&
    (filterType ? row.data_type === filterType : true)
  );

  return (
    <div style={{ padding: 24 }}>
      <h2>Token Usage Query</h2>
      <Select
        style={{ width: 140, marginRight: 16 }}
        value={windowSize}
        onChange={setWindowSize}
      >
        <Select.Option value="Minute">Minute</Select.Option>
        <Select.Option value="Hour">Hour</Select.Option>
        <Select.Option value="Day">Day</Select.Option>
      </Select>

      <RangePicker
        style={{ marginRight: 16 }}
        value={dateRange}
        onChange={setDateRange}
      />

      <Select
        style={{ width: 140, marginRight: 16 }}
        placeholder="筛选 Model"
        allowClear
        value={filterModel}
        onChange={setFilterModel}
      >
        {Array.from(new Set(data.map(item => item.model))).map(model => (
          <Select.Option key={model} value={model}>{model}</Select.Option>
        ))}
      </Select>

      <Select
        style={{ width: 140, marginRight: 16 }}
        placeholder="筛选 Type"
        allowClear
        value={filterType}
        onChange={setFilterType}
      >
        {Array.from(new Set(data.map(item => item.data_type))).map(type => (
          <Select.Option key={type} value={type}>{type}</Select.Option>
        ))}
      </Select>
      <Button onClick={fetchTokens} loading={loading} style={{ marginBottom: 16 }}>
        刷新
      </Button>
      <Column
        data={filteredData}
        xField="period"
        yField="total_tokens"
        seriesField="model"
        isGroup={true}
        label={{ position: 'top' }}
        xAxis={{
          label: {
            autoHide: true,
            autoRotate: false,
          },
        }}
        yAxis={{
          label: {
            formatter: (v) => `${v}`,
          },
        }}
        tooltip={{
          showMarkers: false,
        }}
        interactions={[{ type: 'active-region' }]}
      />
      <Table
        columns={[
          { title: 'Period', dataIndex: 'period', key: 'period', align: 'center' },
          { title: 'Model', dataIndex: 'model', key: 'model', align: 'center' },
          { title: 'Type', dataIndex: 'data_type', key: 'data_type', align: 'center' },
          { title: 'Total Tokens', dataIndex: 'total_tokens', key: 'total_tokens', align: 'center' }
        ]}
        dataSource={filteredData}
        rowKey={row => row.period + row.model + row.data_type}
        loading={loading}
        pagination={{ pageSize: 10 }}
        bordered
      />
    </div>
  );
}

export default App;