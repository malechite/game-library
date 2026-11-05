import { centerStory } from "@storybook-decorators";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "./Carousel";

const meta: Meta<typeof Carousel> = {
  title: "Cinder/Layout/Carousel",
  decorators: [centerStory],
  component: Carousel
};
export default meta;
type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <Carousel>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 200,
                  background: "#f0f0f0",
                  borderRadius: 8,
                  fontSize: 32,
                  fontWeight: 600
                }}
              >
                {index + 1}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
};

export const Vertical: Story = {
  render: () => (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <Carousel orientation="vertical" style={{ height: 300 }}>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 200,
                  background: "#f0f0f0",
                  borderRadius: 8,
                  fontSize: 32,
                  fontWeight: 600
                }}
              >
                {index + 1}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
};
