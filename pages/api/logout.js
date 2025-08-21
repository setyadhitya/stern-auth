export default async function handler(req, res) {
  // clear cookie
  res.setHeader('Set-Cookie', 'token=deleted; HttpOnly; Path=/; Max-Age=0');
  return res.json({ok:true});
}