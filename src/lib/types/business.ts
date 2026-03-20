export interface BusinessProfile {
  id?: number;
  ownerUserId?: string;
  name?: string;
  slug?: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  timeZone?: string | null;
  createdAtUtc?: string;
  updatedAtUtc?: string;
}

export interface CreateBusinessRequest {
  name: string;
  slug: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  timeZone?: string | null;
}