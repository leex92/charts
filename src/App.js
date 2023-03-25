import "./App.css";
import "antd/dist/reset.css";
import { useState } from "react";
import axios from "axios";
import { Button, Card, Radio, Space, Checkbox } from "antd";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
function App() {
  const [type, setType] = useState("line");
  const [status, setStatus] = useState("pause");
  const [checkedList, setCheckedList] = useState(["Pulse"]);
  const CheckboxGroup = Checkbox.Group;
  const plainOptions = ["Pulse", "Temperature", "Sweat", "Gas", "UV"];

  const onChange = (list) => {
    setCheckedList(list);
  };
  const handlePlayPause = (data) => {
    if (data === "play") {
      setStatus("pause");
      axios.get("setFlag?Flag=1");
    } else {
      setStatus("play");
      axios.get("setFlag?Flag=0");
    }
  };
  const options = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
        smooth: true,
      },
    ],
  };
  return (
    <div className="App">
      <div className="header">
        <Button type="link">Data Statistics System</Button>
      </div>
      <div className="content">
        <CheckboxGroup
          options={plainOptions}
          value={checkedList}
          onChange={onChange}
        />
        <br />
        {type === "data" ? (
          <>
            <div>数据</div>
          </>
        ) : (
          <div>
            <ReactECharts option={options} theme={"theme_name"} />
            <ReactECharts option={options} theme={"theme_name"} />
            <ReactECharts option={options} theme={"theme_name"} />
            <ReactECharts option={options} theme={"theme_name"} />
            <ReactECharts option={options} theme={"theme_name"} />
          </div>
        )}
      </div>
      <div className="footer">
        <Space>
          {status === "pause" ? (
            <Button
              onClick={() => handlePlayPause("play")}
              type="primary"    
            >
              Start
            </Button>
          ) : (
            <Button
              onClick={() => handlePlayPause("pause")}
              type="primary"
            >
              Pause
            </Button>
          )}
          {type === "data" ? (
            <Button onClick={() => setType("charts")} type="primary">
              Line
            </Button>
          ) : (
            <Button onClick={() => setType("data")} type="primary">
              Data
            </Button>
          )}
        </Space>
      </div>
    </div>
  );
}

export default App;
