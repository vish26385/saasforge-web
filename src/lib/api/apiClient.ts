import { authStorage } from "@/lib/auth/authStorage";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function isAuthEndpoint(endpoint: string) {
  const normalized = endpoint.toLowerCase();
  return (
    normalized.includes("/auth/login") ||
    normalized.includes("/auth/register")
  );
}

export async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = authStorage.getAccessToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    if (!isAuthEndpoint(endpoint)) {
      authStorage.clear();

      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }

      throw new Error("Your session has expired. Please log in again.");
    }

    throw new Error("Unauthorized");
  }

  if (!response.ok) {
  let errorMessage = "Something went wrong. Please try again.";

  try {
    const errorData = await response.json();

    if (Array.isArray(errorData) && errorData.length > 0) {
      const firstError = errorData[0];

      if (
        firstError?.code === "DuplicateUserName" ||
        String(firstError?.description || "")
          .toLowerCase()
          .includes("already taken")
      ) {
        errorMessage = "An account with this email already exists";
      } else if (typeof firstError?.description === "string") {
        errorMessage = firstError.description;
      }
    } else if (
      typeof errorData?.message === "string" &&
      errorData.message.trim()
    ) {
      errorMessage = errorData.message;
    } else if (
      typeof errorData?.title === "string" &&
      errorData.title.trim()
    ) {
      errorMessage = errorData.title;
    }
  } catch {
    // ignore json parse failure
  }

  throw new Error(`${response.status}: ${errorMessage}`);
}

  const contentType = response.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  return {} as T;
}

export const apiClient = {
  get: <T>(endpoint: string) =>
    request<T>(endpoint, {
      method: "GET",
    }),

  post: <T>(endpoint: string, body?: unknown) =>
    request<T>(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),

  put: <T>(endpoint: string, body?: unknown) =>
    request<T>(endpoint, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T>(endpoint: string) =>
    request<T>(endpoint, {
      method: "DELETE",
    }),
};