<template>
  <div class="about">
    <h1>Аналитика</h1>
    <div class="hello" ref="chartdiv"></div>
  </div>
</template>
<script>
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
export default {
  name: "AnalyticsView",
  mounted() {
    let root = am5.Root.new(this.$refs.chartdiv);

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(am5xy.XYChart.new(root, {}));

    let xRenderer = am5xy.AxisRendererX.new(root, {});
    xRenderer.grid.template.set("forceHidden", true);
    xRenderer.labels.template.setAll({ multiLocation: 0, location: 0 });

    let xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: "minute", count: 30 },
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
        extraMin: 0.01,
        extraMax: 0.01,
        tooltipLocation: 0,
      })
    );

    let yRenderer = am5xy.AxisRendererY.new(root, {});
    yRenderer.grid.template.set("forceHidden", true);

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: yRenderer,
      })
    );

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "none",
        xAxis: xAxis,
      })
    );
    cursor.lineY.set("visible", false);

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    let series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "visits",
        valueXField: "date",
        locationX: 0,
        seriesTooltipTarget: "bullet",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
        }),
      })
    );

    series.bullets.push(function () {
      let circleTemplate = am5.Template.new({
        radius: 6,
        templateField: "bulletSettings",
        fill: series.get("fill"),
        strokeWidth: 1,
        stroke: root.interfaceColors.get("background"),
      });

      let circle = am5.Circle.new(root, {}, circleTemplate);

      return am5.Bullet.new(root, {
        sprite: circle,
        locationX: 0,
      });
    });

    const getTime = (str) => new Date(str).getTime();
    const bulletSettings = {
      fill: am5.color("#9500fb"),
    };

    let data = [
      {
        bulletSettings,
        date: getTime("2020-07-01"),
        visits: 213,
      },
      {
        bulletSettings,
        date: getTime("2020-07-02"),
        visits: 249,
      },
      {
        bulletSettings,
        date: getTime("2020-07-03"),
        visits: 179,
      },
      {
        bulletSettings,
        date: getTime("2020-07-04"),
        visits: 170,
      },
      {
        bulletSettings,
        date: getTime("2020-07-05"),
        visits: 184,
      },
      {
        bulletSettings,
        date: getTime("2020-07-06"),
        visits: 202,
      },
      {
        bulletSettings,
        date: getTime("2020-07-07"),
        visits: 198,
      },
      {
        bulletSettings,
        date: getTime("2020-07-08"),
        visits: 168,
      },
      {
        bulletSettings,
        date: getTime("2020-07-09"),
        visits: 176,
      },
      {
        bulletSettings,
        date: getTime("2020-07-10"),
        visits: 171,
      },
      {
        bulletSettings,
        date: getTime("2020-07-11"),
        visits: 190,
      },
      {
        bulletSettings,
        date: getTime("2020-07-12"),
        visits: 154,
      },
      {
        bulletSettings,
        date: getTime("2020-07-13"),
        visits: 246,
      },
      {
        bulletSettings,
        date: getTime("2020-07-14"),
        visits: 250,
      },
      {
        bulletSettings,
        date: getTime("2020-07-15"),
        visits: 227,
      },
      {
        bulletSettings,
        date: getTime("2020-07-16"),
        visits: 140,
      },
      {
        bulletSettings,
        date: getTime("2020-07-17"),
        visits: 170,
      },
      {
        bulletSettings,
        date: getTime("2020-07-18"),
        visits: 125,
      },
      {
        bulletSettings,
        date: getTime("2020-07-19"),
        visits: 106,
      },
      {
        bulletSettings,
        date: getTime("2020-07-20"),
        visits: 207,
      },
      {
        bulletSettings,
        date: getTime("2020-07-21"),
        visits: 222,
      },
      {
        bulletSettings,
        date: getTime("2020-07-22"),
        visits: 198,
      },
      {
        bulletSettings,
        date: getTime("2020-07-23"),
        visits: 204,
      },
      {
        bulletSettings,
        date: getTime("2020-07-24"),
        visits: 213,
      },
      {
        bulletSettings,
        date: getTime("2020-07-25"),
        visits: 145,
      },
      {
        bulletSettings,
        date: getTime("2020-07-26"),
        visits: 166,
      },
      {
        bulletSettings,
        date: getTime("2020-07-27"),
        visits: 163,
      },
      {
        bulletSettings,
        date: getTime("2020-07-28"),
        visits: 135,
      },
      {
        bulletSettings,
        date: getTime("2020-07-29"),
        visits: 45,
      },
    ];

    series.data.setAll(data);

    series.appear(0);
    chart.appear(0, 100);
  },

  beforeDestroy() {
    if (this.root) {
      this.root.dispose();
    }
  },
};
</script>

<style>
.hello {
  width: 100%;
  height: 500px;
}
</style>
