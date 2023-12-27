export type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function rectIntersect (rect1: Rect, rect2: Rect): boolean {
  const [left1, top1, right1, bottom1] = [rect1.x, rect1.y + rect1.height, rect1.x + rect1.width, rect1.y]
  const [left2, top2, right2, bottom2] = [rect2.x, rect2.y + rect2.height, rect2.x + rect2.width, rect2.y]

  return !(top1 < bottom2 || top2 < bottom1 || right1 < left2 || right2 < left1)
}
