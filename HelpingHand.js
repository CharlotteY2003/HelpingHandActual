var count =0;
var username;
var post = document.getElementById("post");
var file = document.getElementById("file1");
var row = document.getElementById("choiceRow");
var name = document.getElementById("name");
var nameInput = document.getElementById("nameInput");
var description = document.getElementById("description");
var descriptionInput = document.getElementById("descriptionInput");
var homepage = document.getElementById("homePage");
var button = document.getElementById("submitButton");
var key;
var geocoder;

function SignIn()
{
    username = document.getElementById("username").value;
    
    var original = true;
    //console.log(username);
    firebase.database().ref().once("value").then(function(snapshot)
    {
        snapshot.forEach(function(snapshot)
        {
            var index = snapshot.child("poster").val().indexOf("*/");
            var word = snapshot.child("poster").val().substring(6,index);
            //console.log(word);
            if(word === username)
            {
                original = false;
                //console.log("passes");
            }
            //console.log(original);
        });
        if(original)
        {
            removeElement(document.getElementById("introBox"));
            //console.log(document.getElementById("introBox"));
            homepage.style.visibility = "visible";
            appear(document.getElementById("name"),"15px","30px",1);
            appear(nameInput,"30px", "450px",1);
            appear(description, "15px", "30px",1);
            appear(descriptionInput,"40px","450px",1);
            appear(post, "400px","500px",1);
            test();
            nameInput.style.background = "transparent";
            nameInput.style.border = "none";
            nameInput.style.borderBottom = "1px solid black";
            appear(button,"20px","70px",1);
            descriptionInput.style.transform = "scaleY(1.75)";
            if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          pos = [position.coords.latitude,position.coords.longitude];
            
          console.log(pos);
          if(pos.length !=0 )
          {
            
            
            
            //alert("All done!");
            //findKey();
            //clear(false); 
          }

          //infoWindow.setPosition(pos);
          
          //infoWindow.open(map);
         // map.setCenter(pos);
        }, function() {
          alert("Not working");
        });
    }
        }
        else{
            alert("Sorry, that username is taken. Please try again");
        }
    });
  

}

function findKey()
{
    
    firebase.database().ref().once("value").then(function(snapshot)
    {
        snapshot.forEach(function(snapshot)
        {
            if(snapshot.child("user").val() === username)
            {
                key = snapshot.key;
                //console.log(key);
            }
        });
    });
}

function removeElement(element)
{
    element.style.visibility = "hidden";
    element.style.margin = "0px";
    element.style.height = "0px";
    element.style.width = "0px";
}

function appear(element,height,width,index)
{
    element.style.visibility = "visible";
    element.style.margin = "20px";
    element.style.height = height;
    element.style.width = width;
    element.style.zIndex = index;
    
}

function test()
{
    //post.style.zIndex = "auto";
    post.style.position = "relative";
    post.style.boxShadow = "0px 0px 10px rgba(0,0,0,0.25)";
    post.style.margin = "20px";
    post.style.display = "flex";
    post.style.flexDirection = "column";
    
    
}

var url;



var infoWindow;
var map;
var pos;

function getPost()
{
    var pos;
    var currentTime = new Date();
    var time = currentTime.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' });
    var fullTime = "";
    fullTime += time;
    //console.log(fullTime);
    fullTime += " ";
    fullTime += (currentTime.getMonth()+1);
    //console.log(currentTime.getMonth());
    fullTime += "/";
    fullTime +=  currentTime.getDate();
    fullTime += "/";
    fullTime += currentTime.getFullYear();
    //console.log(fullTime);
   // alert("Done");
    

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          pos = [position.coords.latitude,position.coords.longitude];
            
          console.log(pos);
          if(pos.length !=0 )
          {
            category = categoryChecked();
            if(category != null)
            {
               infoWindow.setContent('Location found.');
                des = descriptionInput.value;
                postTitle = nameInput.value; 
                firebase.database().ref().push({
                    //user: username,
                    description: des,
                    title: postTitle,
                    timeStamp: fullTime,
                    poster: "User: " + username + "*/",
                    location: pos,
                    category: category,
                    //multiple: false,
                    alerts: ["N/A"]
            });

              //  alert("All done!");
            clear(false); 
            }
            
            
            /*firebase.database().ref(key).update({"description": des});
            firebase.database().ref(key).update({"title": postTitle});
            firebase.database().ref(key).update({"timeStamp": fullTime});
            firebase.database().ref(key).update({"location": pos});
            firebase.database().ref(key).update({"poster": username});
            firebase.database().ref(key).update({"image": url});*/
            
          }

          
        }, function() {
          alert("Not working");
        });
    }
    
    
        
}


function initMap() {
    
    infoWindow = new google.maps.InfoWindow;
    geocoder = new google.maps.Geocoder;
    
}

function withinEachOther(element)
{
   console.log(pos);
    user1Lat = pos[0];
    user1Lng = pos[1];
    user2Lat = element[0];
    user2Lng = element[1];
    
    var distance = google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng({lat: user1Lat, lng: user1Lng}),
        new google.maps.LatLng({lat:user2Lat, lng:user2Lng})//new google.maps.LatLng(user2Lat, user2Lng)
      );
    
    if(distance <= 402.336)
    {
        return true;
    }
    else{
       console.log("uh oh");
       console.log(distance);
        return false;
        
    }
}
var numElements = [];
function displayFeed()
{
    
    //var count =0;
    firebase.database().ref().once("value").then(function(snapshot)
    {
        //console.log(numElements);
        snapshot.forEach(function(snapshot)
        {
            var original = snapshot.child("poster").val();
            var startIndex = original.indexOf("User: ");
            var endIndex = original.indexOf("*/");
            var postername = original.substring(startIndex + 6, endIndex);
            console.log(postername);
            if(withinEachOther(snapshot.child("location").val()) && !(postername === (username)))
            {
                
                if(!(postername === ("N/A"))) 
                {
                    
                        console.log(numElements);
                        console.log(yourElements);
                       if(!(numElements.includes(snapshot.key)) && !(yourElements.includes(snapshot.key)))
                    {
                        count++;
                        numElements.push(snapshot.key);
                        //console.log(snapshot.child("poster").val());
                        reverseGeocode(snapshot.child("location").val(),snapshot.child("timeStamp").val(),snapshot.child("title").val(),snapshot.child("description").val(), snapshot.child("category").val(), count, original);
                    } 
                    
                    
                    
                        
                
                
                
                
                }
                
                
                
                
                
                
               
                
                
               
                
            }
        });
        
    });
    
}



function clear(element)
{
    console.log(element);
    if(element)
    {
        removeElement(post);
        
    }
    else{
        
         nameInput.value = "";
         var ele = document.getElementsByName("category");
   for(var i=0;i<ele.length;i++)
      ele[i].checked = false;
    //image.src = "https://360livemedia.com/wp-content/uploads/2020/03/placeholder.png";
    descriptionInput.value = "";
    //var element = document.getElementById("multipleUsers");
    //element.checked = false;
    }
   
}

function feed()
{
    clear(true);
    displayFeed();
    removeElement(post);
    //console.log(name);
   // removeElement(name);
   removeElement(document.getElementById("name"));
    removeElement(nameInput);
    removeElement(description);
    removeElement(descriptionInput);
    removeElement(button);
    console.log(yourCount);
    for(i=1; i<= yourCount; i++)
    {
        console.log(i);
        var word = "Element" + i;
        console.log(word);
        removeElement(document.getElementById(word));
    }
    for(i=1; i<=count; i++)
    {
        var word = "Div" + i;
        appear(document.getElementById(word),"fit-content","700px", "auto");
    }
    
    //removeElement(image);
    //name.style.visibility = "hidden";
}

function displayNewPost(element)
{
    element.style.height = "content-fit";
    element.style.width = "700px";
    element.style.margin = "20px";
    element.style.borderRadius = "10px";
    element.style.boxShadow = "0px 0px 10px rgba(0,0,0,0.25)";
    element.style.visibility = "visible";
    //element.style.border = "1px solid black";
    element.style.display = "flex";
    element.style.flexDirection = "column";
    document.body.appendChild(element);
    //var btn = document.createElement("BUTTON");
  //document.body.appendChild(btn);
}




   
function addPostElement(element, element2, element3, element4, element5, num, element6)
{
    var address = element4;
    var id = "Div" + num;
    
    var newPost = document.createElement("div");
    newPost.setAttribute("id", id);
    newPost.style.cursor = "pointer";
    newPost.style.borderStyle = "none";
    newPost.style.padding = "25px";
    
    var subPost = document.createElement("div");
    var subPost2 = document.createElement("div");
    var subPost3 = document.createElement("div");
    var subPost4 = document.createElement("div");
    var subPost5 = document.createElement("div");
    var subPost6 = document.createElement("div");
    newContent = document.createTextNode(element);
    newContent2 = document.createTextNode(element2);
    newContent3 = document.createTextNode(element3);
    newContent4 = document.createTextNode(address);
    newContent5 = document.createTextNode(element5);
    newContent6 = document.createTextNode(element6);
    subPost2.style.fontSize = "30px";
    if(element5 === "Donor")
    {
        subPost5.style.background = "#e76f51";
    }
    else if(element5 === "Security")
    {
        subPost5.style.background = "#4ecdc4";
    }
    else if(element5 === "Favor")
    {
        subPost5.style.background = "#f6bd60";
    }
    else{
        subPost5.style.background = "#e71d36";
    }
    
    subPost5.style.width = "fit-content";
    subPost5.style.boxShadow = "0px 0px 10px rgba(0,0,0,0.25)";
    subPost5.style.borderRadius = "2px";
    subPost5.style.padding = "3px 7px";
    subPost3.style.marginBottom = "20px";
    
subPost.style.margin = "3px";
subPost2.style.margin = "3px";
subPost3.style.margin = "3px";
subPost4.style.margin = "3px";
subPost5.style.margin = "3px";
subPost6.style.margin = "3px";
subPost6.style.background = "#d4e09b";
subPost6.style.width = "fit-content";
subPost6.style.boxShadow = "0px 0px 10px rgba(0,0,0,0.25)";
subPost6.style.borderRadius = "2px";
subPost6.style.padding = "3px 7px";
console.log(newContent);
console.log(subPost);
subPost.append(newContent);
subPost2.append(newContent2);
subPost3.append(newContent3);
subPost4.append(newContent4);
subPost5.append(newContent5);
subPost6.append(newContent6);
newPost.append(subPost);
newPost.append(subPost4);
newPost.append(subPost5);
newPost.append(subPost6);
newPost.append(subPost2);
newPost.append(subPost3);
newPost.ondblclick = function()
{
    savePost(newPost);
};
displayNewPost(newPost);
    
       
    
    
    

    
        
        

   
}

function reverseGeocode(list, element1, element2, element3, element4, num, element6)
{
    console.log(element4);
    const latlng = {
        lat: list[0],
        lng: list[1]
    };
    geocoder.geocode({"location": latlng}, function(results, status)
    {
        if(status === "OK")
        {
            var address = results[0].formatted_address;
           
            addPostElement(element1,element2,element3, address, element4, num, element6);
            
        }
        else{
            alert(status);
        }
    });
}


function categoryChecked()
{
    if(document.getElementById("donator").checked)
    {
        return document.getElementById("donator").value;
    }
    else if(document.getElementById("secure").checked)
    {
        return document.getElementById("secure").value;
    }
    else if(document.getElementById("favor").checked)
    {
        return document.getElementById("favor").value;
    }
    else if(document.getElementById("requester").checked)
    {
        return document.getElementById("requester").value;
    }
    else{
        alert("Category has not been filled out");
        return null;
    }
}

function checkboxChecked()
{
    if(document.getElementById("multipleUsers").checked)
    {
        return true;
    }
    else{
        return false;
    }
}

function createPost()
{
   console.log(count); 
    removeElement(document.getElementById("introBox"));
    for(i=1; i<=count; i++)
    {
        var word = "Div" + i;
        removeElement(document.getElementById(word));
    }
    for(i=1; i<=yourCount; i++)
    {
        var word = "Element" + i;
        removeElement(document.getElementById(word));
    }
    
    homepage.style.visibility = "visible";
    
    appear(document.getElementById("name"),"15px","30px",1);
    appear(nameInput,"30px", "450px",1);
    appear(description, "15px", "30px",1);
    appear(descriptionInput,"40px","450px",1);
   
    appear(post, "400px","500px",1);
    

    test();
    nameInput.style.background = "transparent";
    nameInput.style.border = "none";
    nameInput.style.borderBottom = "1px solid black";
    appear(button,"20px","70px",1);
    descriptionInput.style.transform = "scaleY(1.75)";
}





var savePostList = [];
function savePost(element)
{
    
    
    savePostList.push(element);
    console.log(savePostList);
    
    //console.log(posterName);
    findPostuser(element);



}

function findPostuser(element)
{
    //alert("findPostuser enters through");
    console.log(element);
    var startIndex = element.textContent.indexOf("User: ");
    var endIndex = element.textContent.indexOf("*/");
   var posterName = element.textContent.substring(startIndex, endIndex+2);
    firebase.database().ref().once("value").then(function(snapshot)
    {
        var once = false;
        snapshot.forEach(function(snapshot)
        {
            console.log(snapshot.child("poster").val());
            if(snapshot.child("poster").val() === posterName && !once && snapshot.child("title").val() == element.children[4].textContent)
            {
                once = true;
                notifyUser(snapshot.key, username, element);
                //alert("FindPostuser passes through");
            }
        })
    })
}

var savedPostList = [];

function notifyUser(user, otherUser, nameOfPost)
{
    
   
    firebase.database().ref(user).once("value").then(function(snapshot)
    {
        
        var alertList = snapshot.child("alerts").val();
        posttitle = nameOfPost.children[4].textContent;
        console.log(posttitle);
        alertList.push(otherUser + " has offered a helping hand to your post " + posttitle);
        console.log(alertList);
        firebase.database().ref(snapshot.key).update({"alerts": alertList});
        savedPostList.push(nameOfPost);
        console.log(savedPostList);
       // alert("Notify User has gone through");
    });
    
    
}

function showSavedPostList()
{
    removeElement(post);
    removeElement(descriptionInput);
    removeElement(nameInput);
    removeElement(document.getElementById("name"));
    //console.log(name.value);
    removeElement(description);
    removeElement(button);
    for(i=1; i<=count; i++)
    {
        var word = "Div" + i;
        removeElement(document.getElementById(word));
    }
    for(i=1; i<=yourCount; i++)
    {
        var word = "Element" + i;
        removeElement(document.getElementById(word));
    }
    for(i=0; i<savedPostList.length; i++)
    {
        console.log(savedPostList[i].id);
        if(savedPostList[i] === void(0))
        {
            alert("Something went wrong. Please try again");
        }
        else{
            appear(savePostList[i], "fit-content","700px", "auto");
        }
    }

}

function showAlerts()
{
    
    timer = setInterval(function()
    {
        firebase.database().ref().once("value").then(function(snapshot)
        {
            snapshot.forEach(function(snapshot)
            {
                var text = snapshot.child("poster").val();
                var startIndex = text.indexOf("User: ");
                var endIndex = text.indexOf("*/");
                var posterName = text.substring(startIndex+6, endIndex);
                
                if(username != void(0))
                {
                   
                    if(posterName === username)
                    {
                    
                    var alerts = snapshot.child("alerts").val();
                    if(alerts.length>1)
                        {
                        console.log(alerts.length);
                        for(i = 1; i<alerts.length; i++)
                        {
                            alert(alerts[i]);
                            console.log(i);
                            alerts.splice(i,1);
                            i--;
                            //console.log(alerts);
                            
                        }
                        firebase.database().ref(snapshot.key).update({"alerts": alerts});
                        }
                    }
                }
                

            });
        });
    }, 10000);
}

var yourCount = 0;
var yourElements = [];
function showYourPostList()
{
   removeElement(post);
   removeElement(document.getElementById("name"));
    removeElement(nameInput);
    removeElement(description);
    removeElement(descriptionInput);
    removeElement(button);
    for(i=1; i<=count; i++)
    {
        var word = "Div" + i;
        removeElement(document.getElementById(word));
    }
    
   

   firebase.database().ref().once("value").then(function(snapshot)
   {
        snapshot.forEach(function(snapshot)
        {
            var text = snapshot.child("poster").val();
            var index = text.indexOf("*/");
            var word = text.substring(6,index);
            console.log(text);
            if(word === username && !yourElements.includes(snapshot.key) )
            {
                
                yourCount++;
                console.log(yourCount);
                yourElements.push(snapshot.key);
                const latlng = {
                    lat: snapshot.child("location").val()[0],
                    lng: snapshot.child("location").val()[1]
                };
                geocoder.geocode({"location": latlng}, function(results, status)
                {
                    if(status === "OK")
                    {
                        var address = results[0].formatted_address;
                       console.log(address);
                        //addPostElement(element1,element2,element3, address, element4, num, element6);

                        
    var id = "Element" + yourCount;
    
    //reverseGeocode(snapshot.child("location").val(),snapshot.child("timeStamp").val(),snapshot.child("title").val(),snapshot.child("description").val(), snapshot.child("category").val(), count, original);

    var newPost = document.createElement("div");
    newPost.setAttribute("id", id);
    newPost.style.cursor = "pointer";
    newPost.style.padding = "25px";
    var subPost = document.createElement("div");
    var subPost2 = document.createElement("div");
    var subPost3 = document.createElement("div");
    var subPost4 = document.createElement("div");
    var subPost5 = document.createElement("div");
    var subPost6 = document.createElement("div");
    newContent = document.createTextNode(snapshot.child("timeStamp").val());
    newContent2 = document.createTextNode(snapshot.child("title").val());
    newContent3 = document.createTextNode(snapshot.child("description").val());
    
    newContent4 = document.createTextNode(address);
    newContent5 = document.createTextNode(snapshot.child("category").val());
    newContent6 = document.createTextNode(snapshot.child("poster").val());
    subPost2.style.fontSize = "30px";
    if(snapshot.child("category").val() === "Donor")
    {
        subPost5.style.background = "#e76f51";
    }
    else if(snapshot.child("category").val() === "Security")
    {
        subPost5.style.background = "#4ecdc4";
    }
    else if(snapshot.child("category").val() === "Favor")
    {
        subPost5.style.background = "#f6bd60";
    }
    else{
        subPost5.style.background = "#e71d36";
    }
    
    subPost5.style.width = "fit-content";
    subPost5.style.boxShadow = "0px 0px 10px rgba(0,0,0,0.25)";
    subPost5.style.borderRadius = "2px";
    subPost5.style.padding = "3px 7px";
    subPost3.style.marginBottom = "20px";
    
subPost.style.margin = "3px";
subPost2.style.margin = "3px";
subPost3.style.margin = "3px";
subPost4.style.margin = "3px";
subPost5.style.margin = "3px";
subPost6.style.margin = "3px";
subPost6.style.background = "#d4e09b";
subPost6.style.width = "fit-content";
subPost6.style.boxShadow = "0px 0px 10px rgba(0,0,0,0.25)";
subPost6.style.borderRadius = "2px";
subPost6.style.padding = "3px 7px";
console.log(newContent);
console.log(subPost);
subPost.append(newContent);
subPost2.append(newContent2);
subPost3.append(newContent3);
subPost4.append(newContent4);
subPost5.append(newContent5);
subPost6.append(newContent6);
newPost.append(subPost);
newPost.append(subPost4);
newPost.append(subPost5);
newPost.append(subPost6);
newPost.append(subPost2);
newPost.append(subPost3);
displayNewPost(newPost);
                        
                    }
                    else{
                        alert(status);
                    }
                });
            }
        });
   });
   
    
}




    