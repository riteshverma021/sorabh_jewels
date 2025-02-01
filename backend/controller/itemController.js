import Item from "../models/item.js";
import router from "../route/itemRouter.js";



//to display items
const displayItem = async(req,res)=>{
try {
    const itemData = await Item.find({})
   res.status(200).send(itemData)
   console.log("database items are......." , itemData);
   


} catch (error) {
    res.status(500).json({message:"error in sending the data",error:error.message})
   }
}


//to add new
const addNew=async(req,res)=>{
   let newData = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: {},
   }
   
   if(req.file){
newData.image={
    url:req.file.path,
    filename:req.file.filename
} }

try {
    const addnewData = new Item(newData)
    
    await addnewData.save()
    console.log("new Data addded");
    res.json({ success: true, message: "new data added" })   

} catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" })
    
}
}



//edit it
const editData=async(req,res)=>{

    let {id}=req.params;

    if(id){
             const fetchData = await Item.findById(id);   
             try {
                  res.json(fetchData)
                  
                  
             } catch (error) {
                console.error("error while editing",error)
             } 
    }
    else{
        console.log("something went wrong");
        
    }

}



//updated data

const updatedData = async (req, res) => {
    let { id } = req.params;
  
    let updateData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: {}
    };
  
    // Check if a new image is uploaded
    if (req.file) {
      updateData.image = {
        url: req.file.path,
        filename: req.file.filename
      };
    } else if (req.body.imageUrl && req.body.imageFilename) {
      // If no new image is uploaded, retain the existing image
      updateData.image = {
        url: req.body.imageUrl,
        filename: req.body.imageFilename
      };
    }
  
    try {
      // Update the item with the new data
      const updatedItem = await Item.findByIdAndUpdate(id, updateData, { new: true });
  
      // Respond with success message
      res.json({ success: true, message: "Item is updated", updatedItem });
    } catch (error) {
      console.error("Error updating item:", error);
      res.json({ success: false, message: "Error updating item" });
    }
  };
  





const deleteItem = async(req,res)=>{
    let {id} = req.params

    try {
        await Item.findByIdAndDelete(id)

        res.json({success:true , message:"deleted"})
    } catch (error) {
        res.json({success:false , message:"error while deleting "})
    }

}



export default {displayItem , addNew ,editData , updatedData ,deleteItem}