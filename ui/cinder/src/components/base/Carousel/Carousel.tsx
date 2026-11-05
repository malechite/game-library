"use client";

import * as React from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";

import { cn } from "../../../lib/utils";
import { Button } from "../Button/Button";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import {
  carouselRoot,
  carouselViewport,
  carouselContentHorizontal,
  carouselContentVertical,
  carouselItemHorizontal,
  carouselItemVertical,
  carouselButtonPrevHorizontal,
  carouselButtonPrevVertical,
  carouselButtonNextHorizontal,
  carouselButtonNextVertical,
  srOnly
} from "./Carousel.css";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

const useCarousel = () => {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
};

const Carousel = ({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & CarouselProps) => {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y"
    },
    plugins
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );

  React.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn(carouselRoot, className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
};

const CarouselContent = ({ className, ...props }: React.ComponentProps<"div">) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className={carouselViewport} data-slot="carousel-content">
      <div
        className={cn(orientation === "horizontal" ? carouselContentHorizontal : carouselContentVertical, className)}
        {...props}
      />
    </div>
  );
};

const CarouselItem = ({ className, ...props }: React.ComponentProps<"div">) => {
  const { orientation } = useCarousel();

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(orientation === "horizontal" ? carouselItemHorizontal : carouselItemVertical, className)}
      {...props}
    />
  );
};

const CarouselPrevious = ({
  className,
  variant = "outline",
  size = "icon-sm",
  ...props
}: React.ComponentProps<typeof Button>) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(orientation === "horizontal" ? carouselButtonPrevHorizontal : carouselButtonPrevVertical, className)}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <CaretLeftIcon />
      <span className={srOnly}>Previous slide</span>
    </Button>
  );
};

const CarouselNext = ({ className, variant = "outline", size = "icon-sm", ...props }: React.ComponentProps<typeof Button>) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn(orientation === "horizontal" ? carouselButtonNextHorizontal : carouselButtonNextVertical, className)}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <CaretRightIcon />
      <span className={srOnly}>Next slide</span>
    </Button>
  );
};

export { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, useCarousel };
