import React from "react";
import HighchartsReact from "highcharts-react-official";
import "./Chart.scss";

export default function Charts(props) {
  return (
    <div className="chart_for_all">
      <HighchartsReact highcharts={props?.highcharts} options={props?.series}/>
    </div>
  );
}
