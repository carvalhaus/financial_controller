const fetch = jest.fn();

fetch.mockImplementation((url, options) => {
  if (url.includes("token")) {
    return Promise.resolve({
      ok: false,
      status: 400,
      json: () => Promise.resolve({ error: "Invalid Request" }),
    });
  }

  if (url.includes("user")) {
    return Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({ email: "test@example.com", name: "Test User" }),
    });
  }

  return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
});

module.exports = fetch;
