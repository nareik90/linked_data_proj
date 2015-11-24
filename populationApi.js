var express = require('express');
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended :true}));

var populationTb = JSON.parse(fs.readFileSync('DataSets/population.json', 'utf8'));
var crimeOffence = JSON.parse(fs.readFileSync('DataSets/crimeOffences.json', 'utf8'));

var db = new sqlite3.Database(':memory:');

db.serialize(function ()
{
	db.run("CREATE TABLE population(year Text, a1841 FLOAT, a1851 FLOAT, a1861 FLOAT, a1871 FLOAT, a1881 FLOAT, a1891 FLOAT, a1901 FLOAT, a1911 FLOAT, a1926 FLOAT, a1936 FLOAT, a1946 FLOAT, a1951 FLOAT, a1956 FLOAT, a1961 FLOAT, a1966 FLOAT, a1971 FLOAT, a1979 FLOAT, a1981 INTEGER, a1986 INTEGER, a1991  INTEGER, a1996 INTEGER,a2002 INTEGER, a2006 INTEGER, a2011 INTEGER)");
 
db.run("CREATE TABLE crimeOffences(a2003 INTEGER, a2004 INTEGER,a2005 INTEGER, a2006 INTEGER, a2007 INTEGER, a2008 INTEGER, a2009 INTEGER, a2010 INTEGER, a2011 INTEGER, a2012 INTEGER, a2013 INTEGER, a2014 INTEGER,  crime Text)");
    
    
//==============================================================================    
//populate population table
var stmt = db.prepare('INSERT INTO population Values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');
    
  populationTb.forEach(function (fill)
    {
      stmt.run(fill.year, fill.a1841, fill.a1851, fill.a1861, fill.a1871, fill.a1881, fill.a1891, fill.a1901, fill.a1911,fill.a1926,fill.a1936,fill.a1946,fill.a1951,fill.a1956,fill.a1961,fill.a1966,fill.a1971,fill.a1979,fill.a1981,fill.a1986,fill.a1991,fill.a1996,fill.a2002,fill.a2006,fill.a2011);
   
         console.log(fill.year, fill.a1841, fill.a1851, fill.a1861,fill.a1871, fill.a1881, fill.a1891, fill.a1901, fill.a1911,fill.a1926,fill.a1936,fill.a1946,fill.a1951,fill.a1956,fill.a1961,fill.a1966,fill.a1971,fill.a1979,fill.a1981,fill.a1986,fill.a1991,fill.a1996,fill.a2002,fill.a2006,fill.a2011);
  });
 
  stmt.finalize();
    
//..............................................................................
    
//populating crime database
stmt = db.prepare("INSERT INTO crimeOffences Values (?,?,?,?,?,?,?,?,?,?,?,?,?)");
    
    crimeOffence.forEach(function(fill)  
    {  stmt.run(fill.a2003,fill.a2004,fill.a2005,fill.a2006,fill.a2007,fill.a2007,fill.a2008,fill.a2009,fill.a2010,fill.a2011, fill.a2012,fill.a2013, fill.crime);
    
    console.log(fill.a2003, fill.a2004,fill.a2005,fill.a2006,fill.a2007,fill.a2007,fill.a2008,fill.a2009,fill.a2010,fill.a2011, fill.a2012,fill.a2013,fill.crime);

    });

    stmt.finalize();
    
    //testing to see if data tables were populated
db.each("SELECT * FROM population", function(err, row) {
      console.log(row.year + ": " + row.a1841);
  });
    
    db.each("SELECT * FROM crimeOffences", function(err, row) {
      console.log(row.crime + ": " + row.a2004);
  });


});
//db.close();

//main page
app.get('/', function(req, res) {
  res.send("This is the population API.");
});
    

app.get('/populationVcrime',function (req,res)
{
    
    db.run("SELECT year,");
    res.send("Welcome to population and crime comparison api")
});
 
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//if the user enter /population in the url they will get a display of the entire
//population.json database
app.get('/populationYear', function(req,res)
{
    db.all("select * from population", function(err,row)
    {
      var rowString=JSON.stringify(row,null,'\t');
        res.send(rowString);
        console.log(rowString);
    });
});

//This is a more selective data search
//if the user enters /getYearInfo/ followed by a year the info of that year
//will be displayed fro the population table
app.get('/populationYear/get/:popQry', function(req,res)
{
   db.all("SELECT year, a"+req.params.popQry+" FROM population", function(err,row)
    {
      var rowString=JSON.stringify(row,null,'\t');
        res.send(rowString);
        console.log(rowString);
    });
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//if the user enter /crimeOfences in the url they will get a display of the entire
//crimeOffences.json database
app.get('/crimeOffences', function(req,res)
{
    db.all("SELECT * FROM crimeOffences", function(err,row)
    {
        var rowString=JSON.stringify(row,null,'\t');
        res.send(rowString);
        console.log(rowString);
    });
});


//enter crime id to display yearly rates
app.get('/crimeOf/get/:crimeQry', function(req,res)
{
    db.all("SELECT crime, 0"+req.params.crimeQry+" FROM crimeOffences", function(err,row)
    {
        var rowString=JSON.stringify(row,null,'\t');
        res.send(rowString);
        console.log(rowString);
    });
});

//+++++++++++++++++++++++++++++++++++++++++++++

/*

//Still hav not got this section working
//joined by year and crime. when the user enters a date the
//general population and the crime stats are displayed
app.get('/crimeVyear/:yearPop/:yearCrime', function (req, res)
{
    db.all("SELECT population.year 0"+req.params.yearCrime+" AS population", function(err,row)
    {
        var rowString2 = JSON.stringify(row, null, '\t');
        res.sendStatus(rowString2);
        
    });
});*/

//++++++++++++++++++++++++++++++++++++++++++++++++++++


//method deletes a row from the population datase
app.delete('/populationTot/delete/:populationNt', function (req, res)
{
    db.all("DELETE FROM population WHERE a"+req.params.populationNt+"", function(err,row)
    {
        res.sendStatus("Population with Year;" + req.params.populationNt + " will be deleted");
    });
});


//this is the post method that adds information to the crimeOffence database.
app.post('/criminal/add/:crimeYear/:crimeCom/:crimeStat', function (req, res)
{
    db.all("INSERT INTO crimeOffence(crime, "+req.params.crimeCom+" ) VALUES (\""+req.params.crimeYear+"\", "+req.params.crimeStat+")",  function(err,row)
    {
        res.sendStatus("A new crime added to the crimeOffence Database");
    });
});


var server = app.listen(8000);