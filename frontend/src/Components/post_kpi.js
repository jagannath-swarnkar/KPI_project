import React from "react";
import { Card, TextField, Button, NativeSelect } from "@material-ui/core";
import "./App.css";
import Axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";

export default function Post_kpi(props) {
  const [kpi, setKpi] = React.useState("");
  const [kpi_id, setKpi_id] = React.useState(0);
  const [target, setTarget] = React.useState(0);
  const [percentage, setPercentage] = React.useState(0);
  const [p_err, setP_err] = React.useState("");

  const post_new_kpi = () => {
    if (kpi.length === 0) {
      setP_err("Please choose a KPI from kpi list");
    } else if (kpi.length > 0 && percentage >= 0 && percentage <= 100) {
      Axios.post("http://localhost:8000/post_kpi_target", {
        data: {
          kpi: kpi,
          target: target,
          percentage: percentage,
          kpi_id: kpi_id,
          token: reactLocalStorage.get("token")
        }
      })
        .then(res => {
          props.new_kpi_target(res.data);
        })
        .catch(err => console.log("err in sending new kpi target", err));
    } else {
      setP_err("Please select percentage between 0 to 100");
    }
  };

  const settingkpi = e => {
    console.log(e.target.value);
    setKpi(e.target.value);
    let kpi_id = props.kpi.find(item => item.kpi_name === e.target.value)
      .kpi_id;
    setKpi_id(kpi_id);
  };

  const mouseLeave = () => {
    console.log("onmouseleave");
  };

  return (
    <div>
      <Card style={{ margin: "30px", display: "flex" }}>
        <div>
          <div>
            <Button
              style={{
                width: "300px",
                color: "white",
                background: "red",
                fontWeight: "bold"
              }}
            >
              Select Kpi
            </Button>
          </div>
          <Button style={{ background: "aliceblue" }}>
            <NativeSelect
              disableUnderline
              onChange={settingkpi}
              value={kpi}
              style={{ width: "284px", color: "red", fontWeight: "bold" }}
            >
              <option value="" />
              {props.kpi.map((e, i) => {
                return (
                  <option key={e.kpi_id} value={e.kpi_name}>
                    {e.kpi_name}
                  </option>
                );
              })}
            </NativeSelect>
          </Button>
        </div>
        <hr />
        <div>
          <div>
            <Button
              style={{
                width: "186px",
                color: "white",
                background: "red",
                fontWeight: "bold"
              }}
            >
              Percentage ( % )
            </Button>
          </div>
          <TextField
            style={{ width: "186px" }}
            type="number"
            InputProps={{ inputProps: { min: 0, max: 100 } }}
            value={percentage}
            onChange={e => setPercentage(e.target.value)}
          />
        </div>

        <hr />
        <div>
          <div>
            <Button
              style={{
                width: "186px",
                color: "white",
                background: "red",
                fontWeight: "bold"
              }}
            >
              Target
            </Button>
          </div>
          <TextField
            style={{ width: "186px" }}
            type="number"
            value={target}
            onChange={e => setTarget(e.target.value)}
          />
        </div>
      </Card>
      <p style={{ color: "red", textAlign: "center" }}>{p_err}</p>
      <Button
        type="Submit"
        title="Submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={post_new_kpi}
      >
        Submit
      </Button>
    </div>
  );
}
