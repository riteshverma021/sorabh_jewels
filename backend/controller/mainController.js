import Item from "../models/item.js";


const displayMain =async(req,res)=>{
    const { category } = req.query; // Extract category from query parameters

    try {
      const items = category && category !== "all" // Filter by category if not "all"
        ? await Item.find({ category }) 
        : await Item.find(); // Return all items if category is "all"
  
      res.status(200).json(items);
      console.log("displaymain page...." , items);
      
    } catch (error) {
      res.status(500).json({ message: 'Error fetching items', error });
    }

}

export default {displayMain}