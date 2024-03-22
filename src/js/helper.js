export default async function handler(
  req,
  res
) {
  // (...)
  await res.revalidate("/projects");
  res.status(200).json({ revalidated: true });
}
