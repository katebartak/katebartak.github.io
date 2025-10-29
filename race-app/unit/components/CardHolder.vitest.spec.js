import { mount } from "@vue/test-utils";
import CardHolder from "@/components/CardHolder.vue";
import { describe, it, expect } from "vitest";
import { setupVuetify } from "../test-utils";
const vuetify = setupVuetify();

describe("CardHolder.vue", () => {
  it("renders title prop", () => {
    const wrapper = mount(CardHolder, {
      props: { title: "Test Title" },
      global: { plugins: [vuetify] },
    });
    expect(wrapper.text()).toContain("Test Title");
  });

  it("renders slot content", () => {
    const wrapper = mount(CardHolder, {
      props: { title: "Slot Test" },
      slots: { default: '<div class="slot-content">Hello Slot</div>' },
      global: { plugins: [vuetify] },
    });
    expect(wrapper.find(".slot-content").exists()).toBe(true);
    expect(wrapper.text()).toContain("Hello Slot");
  });
});
