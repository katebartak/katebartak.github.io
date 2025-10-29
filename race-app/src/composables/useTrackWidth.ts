import { ref, nextTick, Ref } from 'vue';
import { useStore } from 'vuex';

/**
 * Composable for managing and updating track width
 * @returns {Object} trackSurface ref, raceTrackEl ref, updateTrackWidth function
 */
export function useTrackWidth() {
  const store = useStore();
  const trackSurface = ref<HTMLElement[] | HTMLElement | null>(null);

  async function updateTrackWidth() {
    await nextTick();
    let trackSurfaces = trackSurface.value;
    let firstTrackSurface = Array.isArray(trackSurfaces) ? trackSurfaces[0] : trackSurfaces;
    const trackWidthValue = firstTrackSurface
      ? (firstTrackSurface as HTMLElement).offsetWidth
      : 500;
    store.dispatch('races/setTrackWidth', trackWidthValue);

    if (Array.isArray(trackSurfaces)) {
      trackSurfaces.forEach((surface) => {
        surface.style.setProperty('--track-width', `${trackWidthValue}px`);
      });
    } else if (trackSurfaces) {
      trackSurfaces.style.setProperty('--track-width', `${trackWidthValue}px`);
    }
  }

  return {
    trackSurface,
    updateTrackWidth,
  };
}
