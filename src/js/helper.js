export default function handler(
  req,
  res
) {
  // await res.revalidate("/projects");
  // res.status(200).json({ revalidated: true });

   if (req.method === "POST") {
     // Process a POST request
   } else {
     // Handle any other HTTP method
     console.log(" Handle any other HTTP method");
   }
}
