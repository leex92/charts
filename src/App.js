import "./App.css";
import "antd/dist/reset.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Radio, Space, Checkbox } from "antd";
import Pulse from "./modules/Pulse";
import Temperature from "./modules/Temperature";
import Sweat from "./modules/Sweat";
import Gas from "./modules/Gas";
import UV from "./modules/UV";
import React from "react";

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
        <div>
          {checkedList.indexOf("Pulse") > -1 && <Pulse type={type} />}
          {checkedList.indexOf("Temperature") > -1 && (
            <Temperature type={type} />
          )}
          {checkedList.indexOf("Sweat") > -1 && <Sweat type={type} />}
          {checkedList.indexOf("Gas") > -1 && <Gas type={type} />}
          {checkedList.indexOf("UV") > -1 && <UV type={type} />}
        </div>
      </div>
      <div className="footer">
        <Space>
          {status === "pause" ? (
            <Button onClick={() => handlePlayPause("play")} type="primary">
              Start
            </Button>
          ) : (
            <Button onClick={() => handlePlayPause("pause")} type="primary">
              Pause
            </Button>
          )}
          {type === "data" ? (
            <Button onClick={() => setType("line")} type="primary">
              Line
            </Button>
          ) : (
            <Button onClick={() => setType("data")} type="primary">
              Data
            </Button>
          )}
          <Button>Save</Button>
        </Space>
      </div>
    </div>
  );
}

export default App;
