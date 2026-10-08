/**
 * DRAFT room/view labels for project photos — please review and correct.
 * Keys are Unsplash photo IDs (shared across projects). Unknown photos fall
 * back to a neutral "Photo N" badge so no image ever shows a wrong room.
 */
const ROOM_LABELS: Record<string, string> = {
  "photo-1600585154340-be6161a56a0c": "Exterior",
  "photo-1600596542815-ffad4c1539a9": "Exterior",
  "photo-1600585152220-90363fe7e115": "Exterior",
  "photo-1613490493576-7fde63acd811": "Exterior",
  "photo-1567496898669-ee935f5f647a": "Exterior",
  "photo-1580587771525-78b9dba3b914": "Exterior",
  "photo-1545324418-cc1a3fa10c00": "Tower view",
  "photo-1486406146926-c627a92ad1ab": "Tower view",
  "photo-1600607687939-ce8a6c25118c": "Living hall",
  "photo-1600607687920-4e2a09cf159d": "Living hall",
  "photo-1600566753086-00f18fb6b3ea": "Living hall",
  "photo-1560448204-e02f11c3d0e2": "Living hall",
  "photo-1600210492486-724fe5c67fb0": "Master bedroom",
  "photo-1524230572899-a752b3835840": "Bedroom",
  "photo-1500382017468-9049fed747ef": "Open grounds",
  "photo-1497366754035-f200968a6e72": "Work lounge",
  "photo-1441986300917-64674bd600d8": "Retail arcade",
  "photo-1470071459604-3b5ec3a7fe05": "Location view",
  "photo-1512453979798-5ea266f8880c": "City view",
};

const idOf = (src: string): string => {
  const match = src.match(/(photo-[a-z0-9-]+)/i);
  return match ? match[1] : src;
};

export const photoLabel = (src: string, index: number): string =>
  ROOM_LABELS[idOf(src)] ?? `Photo ${index + 1}`;
