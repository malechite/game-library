"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "../../../lib/utils";
import {
  chartContainerStyle,
  chartTooltipContentStyle,
  chartTooltipLabelStyle,
  chartTooltipGridStyle,
  chartTooltipItemStyle,
  chartTooltipItemDotStyle,
  chartTooltipIndicatorBase,
  chartTooltipIndicatorDot,
  chartTooltipIndicatorLine,
  chartTooltipIndicatorDashed,
  chartTooltipIndicatorDashedNested,
  chartTooltipValueContainerStyle,
  chartTooltipValueContainerNestedStyle,
  chartTooltipValueContainerDefaultStyle,
  chartTooltipNestedGridStyle,
  chartTooltipItemLabelStyle,
  chartTooltipValueStyle,
  chartLegendContentStyle,
  chartLegendTopStyle,
  chartLegendBottomStyle,
  chartLegendItemStyle,
  chartLegendIndicatorStyle
} from "./Chart.css";

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & ({ color?: string; theme?: never } | { color?: never; theme: Record<keyof typeof THEMES, string> });
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

const useChart = () => {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
};

const ChartContainer = ({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig;
  children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"];
}) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div data-slot="chart" data-chart={chartId} className={cn(chartContainerStyle, className)} {...props}>
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
};

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(([, config]) => config.theme || config.color);

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] || itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`
          )
          .join("\n")
      }}
    />
  );
};

const ChartTooltip = RechartsPrimitive.Tooltip;

const ChartTooltipContent = ({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey
}: React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
  React.ComponentProps<"div"> & {
    hideLabel?: boolean;
    hideIndicator?: boolean;
    indicator?: "line" | "dot" | "dashed";
    nameKey?: string;
    labelKey?: string;
  }) => {
  const { config } = useChart();

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null;
    }

    const [item] = payload;
    const key = `${labelKey || item?.dataKey || item?.name || "value"}`;
    const itemConfig = getPayloadConfigFromPayload(config, item, key);
    const value =
      !labelKey && typeof label === "string" ? config[label as keyof typeof config]?.label || label : itemConfig?.label;

    if (labelFormatter) {
      return <div className={cn(chartTooltipLabelStyle, labelClassName)}>{labelFormatter(value, payload)}</div>;
    }

    if (!value) {
      return null;
    }

    return <div className={cn(chartTooltipLabelStyle, labelClassName)}>{value}</div>;
  }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);

  if (!active || !payload?.length) {
    return null;
  }

  const nestLabel = payload.length === 1 && indicator !== "dot";

  return (
    <div className={cn(chartTooltipContentStyle, className)}>
      {!nestLabel ? tooltipLabel : null}
      <div className={chartTooltipGridStyle}>
        {payload
          .filter((item) => item.type !== "none")
          .map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            const indicatorColor = color || item.payload.fill || item.color;

            return (
              <div key={item.dataKey} className={cn(chartTooltipItemStyle, indicator === "dot" && chartTooltipItemDotStyle)}>
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            chartTooltipIndicatorBase,
                            indicator === "dot" && chartTooltipIndicatorDot,
                            indicator === "line" && chartTooltipIndicatorLine,
                            indicator === "dashed" && chartTooltipIndicatorDashed,
                            nestLabel && indicator === "dashed" && chartTooltipIndicatorDashedNested
                          )}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        chartTooltipValueContainerStyle,
                        nestLabel ? chartTooltipValueContainerNestedStyle : chartTooltipValueContainerDefaultStyle
                      )}
                    >
                      <div className={chartTooltipNestedGridStyle}>
                        {nestLabel ? tooltipLabel : null}
                        <span className={chartTooltipItemLabelStyle}>{itemConfig?.label || item.name}</span>
                      </div>
                      {item.value && <span className={chartTooltipValueStyle}>{item.value.toLocaleString()}</span>}
                    </div>
                  </>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

const ChartLegend = RechartsPrimitive.Legend;

const ChartLegendContent = ({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey
}: React.ComponentProps<"div"> &
  Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
    hideIcon?: boolean;
    nameKey?: string;
  }) => {
  const { config } = useChart();

  if (!payload?.length) {
    return null;
  }

  return (
    <div
      className={cn(chartLegendContentStyle, verticalAlign === "top" ? chartLegendTopStyle : chartLegendBottomStyle, className)}
    >
      {payload
        .filter((item) => item.type !== "none")
        .map((item) => {
          const key = `${nameKey || item.dataKey || "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);

          return (
            <div key={item.value} className={chartLegendItemStyle}>
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className={chartLegendIndicatorStyle}
                  style={{
                    backgroundColor: item.color
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          );
        })}
    </div>
  );
};

const getPayloadConfigFromPayload = (config: ChartConfig, payload: unknown, key: string) => {
  if (typeof payload !== "object" || payload === null) {
    return undefined;
  }

  const payloadPayload =
    "payload" in payload && typeof payload.payload === "object" && payload.payload !== null ? payload.payload : undefined;

  let configLabelKey: string = key;

  if (key in payload && typeof payload[key as keyof typeof payload] === "string") {
    configLabelKey = payload[key as keyof typeof payload] as string;
  } else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key as keyof typeof payloadPayload] === "string") {
    configLabelKey = payloadPayload[key as keyof typeof payloadPayload] as string;
  }

  return configLabelKey in config ? config[configLabelKey] : config[key as keyof typeof config];
};

export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle };
