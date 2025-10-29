declare module '@/utils/race-timing' {
  export function calculateAnimationDuration(
    distance: number,
    condition: number,
    trackWidth: number,
  ): number;
}
