const BASE_URL = "https://shark-app-ixo3s.ondigitalocean.app";

export const authAPI = {
  login: async (credentials) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) throw new Error(`Login failed: ${response.statusText}`);
    return response.json();
  },
};

export const categoryAPI = {
  addCategory: async (categoryData) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(categoryData),
    });
    if (!response.ok)
      throw new Error(`Failed to add category: ${response.statusText}`);
    return response.json();
  },

  updateCategory: async (categoryId, categoryData) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/category/${categoryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(categoryData),
    });
    if (!response.ok)
      throw new Error(`Failed to update category: ${response.statusText}`);
    return response.json();
  },

  getCategories: async (params) => {
    const queryParams = new URLSearchParams({
      skip: params?.skip || 0,
      limit: params?.limit || 10,
      ...(params?.searchString && { searchString: params.searchString }),
      ...(params?.featured !== undefined && { featured: params.featured }),
    });
    const response = await fetch(`${BASE_URL}/category?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok)
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    return response.json();
  },

  getCategoryByCode: async (code) => {
    const response = await fetch(`${BASE_URL}/category/code/${code}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok)
      throw new Error(`Failed to fetch category: ${response.statusText}`);
    return response.json();
  },
};

export const courseAPI = {
  addCourse: async (courseData) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/course`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(courseData),
    });
    if (!response.ok)
      throw new Error(`Failed to add course: ${response.statusText}`);
    return response.json();
  },

  updateCourse: async (courseId, courseData) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/course/${courseId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(courseData),
    });
    if (!response.ok)
      throw new Error(`Failed to update course: ${response.statusText}`);
    return response.json();
  },

  getCourseByCode: async (code) => {
    const response = await fetch(`${BASE_URL}/course/code/${code}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok)
      throw new Error(`Failed to fetch course: ${response.statusText}`);
    return response.json();
  },

  getCourseDisplay: async (params) => {
    const response = await fetch(`${BASE_URL}/course/display`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        skip: params.skip || 0,
        limit: params.limit || 12,
        categoryIds: params.categoryIds,
        languageIds: params.languageIds,
        courseLevels: params.courseLevels,
        search: params.search,
        sort: params.sort,
      }),
    });

    if (!response.ok)
      throw new Error(`Failed to fetch courses: ${response.statusText}`);
    return response.json();
  },
};

export const testimonialAPI = {
  getTestimonials: async () => {
    const response = await fetch(`${BASE_URL}/testimonial`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok)
      throw new Error(`Failed to fetch testimonials: ${response.statusText}`);
    return response.json();
  },

  addTestimonial: async (data) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/testimonial`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok)
      throw new Error(`Failed to add testimonial: ${response.statusText}`);
    return response.json();
  },
};

export const languageAPI = {
  getLanguages: async (params) => {
    const queryParams = new URLSearchParams({
      skip: params?.skip || 0,
      limit: params?.limit || 10,
      ...(params?.search && { search: params.search }),
    });

    const response = await fetch(`${BASE_URL}/languages?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok)
      throw new Error(`Failed to fetch languages: ${response.statusText}`);
    const data = await response.json();
    return data;
  },
};

export const batchAPI = {
  getUpcomingBatches: async (params) => {
    const queryParams = new URLSearchParams({
      skip: params?.skip || 0,
      limit: params?.limit || 10,
    });

    const response = await fetch(
      `${BASE_URL}/batches/upcoming?${queryParams}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok)
      throw new Error(
        `Failed to fetch upcoming batches: ${response.statusText}`
      );
    return response.json();
  },
};
