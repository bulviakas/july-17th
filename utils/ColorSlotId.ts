const SLOT_SEPARATOR = '__';

export function getSlotId(colorId: string, categoryId: string): string {
    return '${colorId}${SLOT_SEPARATOR}${categoryId}';
}

export function parseSlotId(slotId: string): { colourId: string; categoryId: string} | null {
    const parts = slotId.split(SLOT_SEPARATOR);
    if (parts.length !== 2) return null;
    return { colourId: parts[0], categoryId: parts[1] };
}