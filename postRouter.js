  
var express = require('express');
var router = express.Router();
var pool = require('./mysqlConnect');

const multer = require('multer');
const fs = require('fs');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './postImage/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
})
//git Test

var upload = multer({storage: storage})

router.get('/postList', getPostList);
router.post('/postInsert',upload.any(), insertPost);

function getPostList(req, res, next){

    pool.getConnection(function(err, conn){

        if(err){
            console.log(err);
        }
        var postSql = "SELECT * FROM POST_TB";
        conn.query(postSql, function(err, result){
            if(err){
                console.log(err);
                conn.release();
                return; 
            }

            for(var i = 0; i< result.length; i++){
                result[i].imageList = [];
            }
            
            var postImageSql = "SELECT * FROM POST_IMAGE_TB";
            conn.query(postImageSql, function(err, imageResult){
                if(err){
                    console.log(err);
                    conn.release();
                    return; 
                }

                for(var i = 0; i< imageResult.length; i++){
                    
                    for(var j = 0; j< result.length; j++){
                        if(result[j].post_sq_pk === imageResult.post_sq_fk){
                            result.imageList.push(imageResult[i].post_image);
                            break;
                        }
                    }
                }
                res.send({isSuccess: true, data: result});
                conn.release();
                return;
            });

        });
    }); 
};

function insertPost(req, res, next){

    var info = {};
    info.user_sq_fk = req.body.userId;
    info.post_content = req.body.postContent;

    pool.getConnection(function(err, conn){
        if(err){
            console.log(err);
        }
        var postInsertSql = "INSERT INTO POST_TB SET ?";
        conn.query(postInsertSql, info, function(err, insertResult){
            if(err){
                console.log(err);
                conn.release();
                return;
            }

            var postId = insertResult.insertId;

            if(req.files){

                const insertList = [];
                var insertInfo = {};
                insertInfo.post_sq_fk = postId;
                insertInfo.post_image = '/postImage/'+req.files[0].filename;
                
                insertList.push(insertInfo);

                var insertImageSql = "INSERT INTO POST_IMAGE_TB SET ? ; ";
                for(var i =1; i< req.files.length; i++){
                    insertImageSql += "INSERT INTO POST_IMAGE_TB SET ? ; ";

                    insertInfo = {};
                    insertInfo.post_sq_fk = postId;
                    insertInfo.post_image = '/postImage/'+req.files[i].filename;
                }

                conn.query(insertImageSql, insertList, function(err, insertImageResult){
                    if(err){
                        conn.release();
                        return;
                    }

                    res.send({data: "ok"});
                    conn.release();
                    return;

                })
            }else{
                res.send({data: "ok"})
                conn.release();
                return;
            }
        });
    });
}

module.exports = router;