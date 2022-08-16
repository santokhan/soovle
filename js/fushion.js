/**
 * Pass search keyword KD to reload
 * @param {*} KD
 */
function guageCharts(KD) {
  const dataSource = {
    chart: {
      caption: "Keyword Difficulty - KD",
      lowerlimit: "0",
      upperlimit: "100",
      showvalue: "1",
      numbersuffix: "%",
      theme: "fusion",
      showtooltip: "0",
    },
    colorrange: {
      color: [
        {
          minvalue: "0",
          maxvalue: "30",
          code: "#62B58F",
        },
        {
          minvalue: "30",
          maxvalue: "70",
          code: "#FFC533",
        },
        {
          minvalue: "70",
          maxvalue: "100",
          code: "#F2726F",
        },
      ],
    },
    dials: {
      dial: [
        {
          value: KD ? KD : 0,
        },
      ],
    },
  };

  FusionCharts.ready(function () {
    var myChart = new FusionCharts({
      type: "angulargauge",
      renderAt: "chart-container",
      width: "100%",
      height: "100%",
      dataFormat: "json",
      dataSource,
    }).render();
  });
}
guageCharts();
