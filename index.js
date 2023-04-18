const express = require('express');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');

port =  process.env.PORT || 3599;
app.set('view engine', 'ejs');
app.set("static", 'public');
app.use(bodyParser.json())
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'))

const db = mysql.createConnection({
	host : "https://cp33.host-ww.net:2083/",
	user : "maobate1",
	password : "Gur2D;3T3Bo.l4",
	database : "maobate1_nodemyslq"
})

db.connect((err)=>{
	if(err){
       console.log(err); 
    }else{ 
	   console.log("connection established..");
    }
});


app.get('/', (req, res)=>{
	db.query("SELECT * FROM `list`", (err, results)=>{
		
		
		let data = JSON.stringify(results);
		
		if(!err){
			res.render("home" ,{title:"index", data:results});
		}else {
			console.log("data coudnt be fetch at this moment");
		}			
		
	});
	
//mytestphp2021
})

app.get('/about', (req, res)=>{
	res.render("about" ,{title:"about"});
})

app.post('/createlist', (req, res)=>{
    
    const content = req.body.name;
    let sql = `INSERT INTO list (name) VALUES ('${content}')`;

    db.query(sql, (err, results)=>{
			
		if(!err){
			res.render("createlist" ,{results : `Data is inserted which is ${content}`});
		}else {
            res.render(`Data inserte failed...`);
        }	
		
        console.log(sql)
        
	});  
    
})




app.get('/delete/:id', (req, res)=>{
    
    const currentID = req.params.id;
    let sql = `DELETE FROM list WHERE id = '${currentID}'`;

    db.query(sql, (err, results)=>{
			
		if(!err){
			res.send(`Deleted from dB, id ${currentID}...<a href="/">HOME</a>`);
		}else {
            res.send(`Deleting failed..<a href="/">HOME</a>`);
        }	
		
	});  
    
})



app.post("/editelist/:id", (req, res)=>{
    const currentID = req.params.id;
    const content = req.body.name;
    
    console.log(currentID,content)
    
    let sql = `UPDATE list SET name='${content}' WHERE id = '${currentID}'`;
    
    db.query(sql, (err, results)=>{
			
		if(!err){
			res.send(`updated from dB, id ${currentID}...<a href="/">HOME</a>`);
		}else {
            res.send(`Patching failed..<a href="/">HOME</a>`);
        }	
		
	});  
    
    
    console.log(sql)
})


app.get('/list', (req, res)=>{
	db.query("SELECT * FROM `list`", (err, results)=>{
		console.log(results)
		
		if(!err){
			res.send(`here are your results ,${JSON.stringify(results)}`);
		}	
		
	});
})

app.get('/list/:id', (req, res)=>{
    const currentID = req.params.id;
    
    let sql = `SELECT name FROM list WHERE id = '${currentID}'`;
    
	db.query(sql, (err, results)=>{
		err ? console.log("somtheing went wron") : res.send(`here are your results ,${JSON.stringify(results)}`);
	})
	
	console.log(sql)
})










app.listen(port, ()=>{

    console.log(`Server running on ${port} press Ctl-C to terminate`)

})