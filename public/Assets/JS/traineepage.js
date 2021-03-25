/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {

    $("#username").text("<%=Session['ee.username']%>")

    var t = $('#traineeAssignment').DataTable();
    $.ajax({
        url: "user/traineeAssignments",
        type: "POST",
        datatype: "json",
        data: {
//            action: "traineeAssg"
        },
        success: function (result) {
            var data=JSON.parse(result);
            console.log(data);
            for (var i = 0; i < data.assg.length; i++) {
                t.row.add([
                    data.assg[i].id,
                    data.assg[i].name,
                    data.assg[i].description,
                    data.assg[i].deadline,
                    data.assg[i].issuer,
                    '<input type=file  class="fileName" data="' + data.assg[i].name + '#'+data.assg[i].id+'" >'
                ]).draw(false);
            }
        },
        error: function (data) {
            console.log(data);
        }
    });


//    $("#fileName").on("change", prepareUpload);
    $("body").on("change", "input[type='file']", prepareUpload);
});
var files;
var filePath;
function prepareUpload(event) {
//console.log(event.originalEvent.target.outerHTML);

    var file=event.originalEvent.target.outerHTML.split(">")[1].split("</a")[0];
    var assgId=event.originalEvent.target.outerHTML.split("#")[1].split("\">")[0];
    files = event.target.files;
    event.stopPropagation();
    event.preventDefault();
    var data = new FormData();
    data.append("assignmentName",file);
    data.append("assg_Id",assgId);
    $.each(files, function (key, value) {
        data.append(key, value);
    });
    $.ajax({
        url:"SubmissionServlet",
        type:"POST",
        data:data,
        cache:false,
        processData:false,
        contentType:false,
        success:function(data){
            var dat = JSON.parse(data);
            window.location.reload();
//            console.log(dat.status);
        },
        error:function(data){
            var dat = JSON.parse(data);
            console.log(dat.status);
        }
    });
}
