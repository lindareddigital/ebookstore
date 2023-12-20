// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}


export async function getCategory() {
  return fetch('http://localhost:8055/items/Book?fields=Category.*', {
      mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      return data
    })
    .catch(function(err) {
      console.log("Fetch error occurred.", err);
    });
}
