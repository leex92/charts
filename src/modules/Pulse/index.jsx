import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import axios from 'axios';
import { useState, useEffect, useRef } from "react";
const Pulse = ({ type }) => {
  const [Pulse, setPulse] = useState("");
  const [PulseData, setPulseData] = useState([]);
  const [myChart, setMyChart] = useState(undefined);
  const timerRef = useRef();
  const chartsRef = useRef();
  useEffect(() => {
    if (type === "line") {
      const chart = echarts.init(chartsRef.current);
      setMyChart(chart);
      chart.setOption({
        title: {
          text: "Pluse",
        },
        xAxis: {
          type: "time",
          splitLine: {
            show: false,
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            animation: false,
          },
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
          splitLine: {
            show: false,
          },
        },
        series: [
          {
            type: "line",
            showSymbol: false,
            data: [],
          },
        ],
      });
    }
  }, [type]);
  useEffect(()=>{
    axios.get('/setSW?SWstate=2')
  },[])
  useEffect(() => {
    if (myChart && !timerRef.current) {
      timerRef.current = setInterval(() => {
        axios.get("/readADC").then((res) => {
          let value = res.data;
          setPulse(value);
          setPulseData((prev) => {
            prev.push({
              name: Date.now().toString(),
              value: [Date.now(), Math.round(value)],
            });
            myChart && myChart.setOption({ series: [{ data: prev }] });
            return prev;
          });
        });
      }, 200);
    }
    return () => {
      clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [myChart]);
  return (
    <>
      {type === "data" && <div style={{ textAlign: "left", marginBottom: "30px" ,marginTop:'60px'}}> <span style={{display:'inline-block',width:'100px',textAlign:'left'}}> Pulse:</span>{Pulse}</div>}
      {type === "line" && (
        <div ref={chartsRef} style={{ width: "100%", height: "300px" ,marginTop:'60px'}} />
      )}
    </>
  );
};
export default Pulse;
