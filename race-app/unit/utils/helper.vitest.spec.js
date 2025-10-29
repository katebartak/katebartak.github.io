import { describe, it, expect } from 'vitest'
import { getRandomUniqueColor, getRandomUniqueColorList } from '@/utils/helper'

describe('helper.js', () => {
  it('getRandomUniqueColor returns a hex color string', () => {
    const color = getRandomUniqueColor()
    expect(color).toMatch(/^#[0-9a-fA-F]{6}$/)
  })

  it('getRandomUniqueColorList returns correct number of unique colors', () => {
    const count = 10
    const colors = getRandomUniqueColorList(count)
    expect(Array.isArray(colors)).toBe(true)
    expect(colors.length).toBe(count)
    // All colors are unique
    expect(new Set(colors).size).toBe(count)
    // All colors are valid hex
    colors.forEach((color) => {
      expect(color).toMatch(/^#[0-9a-fA-F]{6}$/)
    })
  })
})
