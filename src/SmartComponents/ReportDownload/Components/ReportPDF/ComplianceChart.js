import React from 'react';
import propTypes from 'prop-types';
import chart_color_gold_300 from '@patternfly/react-tokens/dist/esm/chart_color_gold_300';
// eslint-disable-next-line rulesdir/disallow-fec-relative-imports
import { Chart } from '@redhat-cloud-services/frontend-components-pdf-generator';
import { fixedPercentage } from 'Utilities/TextHelper';

// TODO Legend table style need to be disablable
const ComplianceChart = ({
  policy: { percentCompliant = 0 },
  compliantSystemCount,
  nonCompliantSystemCount,
  unsupportedSystemCount,
  nonReportingSystemCount,
}) => {
  const compliantSystemsChartData = [
    {
      x: `${compliantSystemCount} systems compliant`,
      y: compliantSystemCount,
    },
    {
      x: `${nonCompliantSystemCount} systems non-compliant`,
      y: nonCompliantSystemCount,
    },
    ...(unsupportedSystemCount > 0
      ? [
          {
            x: `${unsupportedSystemCount} systems not supported`,
            y: unsupportedSystemCount,
            color: chart_color_gold_300.value,
          },
        ]
      : []),
    ...(nonReportingSystemCount > 0
      ? [
          {
            x: `${nonReportingSystemCount} systems never reported`,
            y: 0,
          },
        ]
      : []),
  ];
  const compliancePercentage = fixedPercentage(percentCompliant);

  return (
    <Chart
      legendHeader={''}
      chartType="donut"
      subTitle="Compliant"
      title={compliancePercentage}
      data={compliantSystemsChartData}
    />
  );
};

ComplianceChart.propTypes = {
  policy: propTypes.object,
  compliantSystemCount: propTypes.number,
  nonCompliantSystemCount: propTypes.number,
  unsupportedSystemCount: propTypes.number,
  nonReportingSystemCount: propTypes.number,
};

export default ComplianceChart;
