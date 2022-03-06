import React, { useMemo, useRef } from 'react';
import isEmpty from 'lodash/isEmpty';
import ReactECharts from 'echarts-for-react';
import { registerTransform } from 'echarts/core';
import { ComponentProps } from '@incorta-org/component-sdk';

import { useScript, useFullViewport } from 'hooks';
import { BASE_PLOT_CHART_OPTIONS } from 'constants/general';

const INCOME_INDEX = 0;
const LIFE_EXPECTANCY_INDEX = 1;
const POPULATION_INDEX = 2;
const COUNTRY_INDEX = 3;
const YEAR_INDEX = 4;

const BoxPlotChart = (props: ComponentProps) => {
  const ref = useRef(null);
  const data = props.response.data;

  const {
    rect: { width, height }
  } = useFullViewport(ref);

  const { isReady: isScriptLoaded } = useScript(
    'https://cdn.jsdelivr.net/npm/echarts-simple-transform/dist/ecSimpleTransform.min.js'
  );

  const datasetFormatted = data.map(cell => [
    Number(cell[INCOME_INDEX]?.value),
    Number(cell[LIFE_EXPECTANCY_INDEX]?.value),
    Number(cell[POPULATION_INDEX]?.value),
    cell[COUNTRY_INDEX]?.value,
    Number(cell[YEAR_INDEX]?.value)
  ]);

  const options = useMemo(() => {
    if (!isScriptLoaded || isEmpty(datasetFormatted)) {
      return {};
    }

    // registerTransform(window.ecSimpleTransform.aggregate);

    return {
      ...BASE_PLOT_CHART_OPTIONS,
      dataset: [
        ...BASE_PLOT_CHART_OPTIONS.dataset,
        {
          id: 'raw',
          source: datasetFormatted
        }
      ]
    };
  }, [datasetFormatted, isScriptLoaded]);

  return (
    <div ref={ref}>
      <ReactECharts option={options} style={{ width, height }} />
    </div>
  );
};

export default BoxPlotChart;
