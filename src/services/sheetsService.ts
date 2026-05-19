import type { Unit } from "../types";

const API_URL =
  "https://script.google.com/macros/s/AKfycbxWbv7qZhcTiVgoAeaRTWlNUOYBF3j0ISwlJlS5Xz_xIOZ-XZvluJn9VvdM5EXyZXFLzA/exec";

function parseStatus(status: string) {
  if (!status) return "available";

  const s = status.toLowerCase();

  if (
    s.includes("reserved") ||
    s.includes("محجوز")
  ) {
    return "reserved";
  }

  if (
    s.includes("sold") ||
    s.includes("مباع")
  ) {
    return "sold";
  }

  return "available";
}

function parseFeatures(features: string) {
  if (!features) return [];

  return features
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function fetchUnitsFromSheet(): Promise<Unit[]> {
  try {
    const response = await fetch(API_URL);

    const data = await response.json();

    return data.map((item: any) => ({
      id: Number(item.id),
      building: item.building || "",
      floor: item.floor || "",
      area: Number(item.area) || 0,
      bedrooms: Number(item.bedrooms) || 0,
      bathrooms: Number(item.bathrooms) || 0,
      price: Number(item.price) || 0,
      status: parseStatus(item.status),
      features: parseFeatures(item.features),
    }));
  } catch (error) {
    console.error("Sheet Error:", error);
    return [];
  }
}export async function submitLead(data: any) {
  console.log("Lead Submitted:", data);

  return {
    success: true,
  };
}