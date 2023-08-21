const mongoose=require('mongoose')

function unique(){
    const sample="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    var id=""
    do{
        id=""
        while(id.length<8){
            id+=sample[Math.floor(Math.random()*sample.length)]
        }
    }while(ids.includes(id))
    ids.push(id)
    return id;
}

let ids=[]

const urls=mongoose.Schema({
    long: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: unique
    },
    click: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports=mongoose.model("urls",urls)