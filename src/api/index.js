export default async (req, res) => {
  const { reqHandler } = await import('../dist/precis-ui/server/server.mjs');
  return reqHandler(req, res);
};