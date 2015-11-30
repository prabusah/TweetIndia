//ALWAYS LAUNCH USING http://127.0.0.1:8080 as in SYNC with CALLBACK.
//OTHERWISE YOU WILL GET NEW SESSIONID ON CALLBACK.
var express = require('express');
var router = express.Router();
var twitterAPI = require('node-twitter-api');
var fs = require('fs');
var multer  = require('multer');
var upload = multer({ dest: 'public/uploads/' });

var twitter = new twitterAPI({
    consumerKey: 'CONSUMERKEY FROM TWITTER',
    consumerSecret: 'CONSUMERSECRET FROM TWITTER',
    callback: 'http://gapi-54290.onmodulus.net/callbackurl'
    //callback: 'http://127.0.0.1:8080/callbackurl'
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index.ejs');
});

router.post('/twitterSignIn', function(req, res, next) {
    twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
        if (error) {
            console.log("Error getting OAuth request token : " + error);
        } else {
            var sess = req.session;
            sess.rToken = requestToken;
            sess.rTokenSecret = requestTokenSecret;
            sess.tweetContent = req.body.tweetContent;
            res.redirect("https://api.twitter.com/oauth/authenticate?oauth_token=" + requestToken);
        }
    });
});

router.get('/callbackurl', function(req, res, next) {
    var oToken = req.query.oauth_token;
    var oVerifier = req.query.oauth_verifier;
    var rToken = '';
    var rTokenSecret = '';
    var sess = req.session;
    rToken = sess.rToken;
    rTokenSecret = sess.rTokenSecret;

    twitter.getAccessToken(rToken, rTokenSecret, oVerifier, function(error, accessToken, accessTokenSecret, results) {
        if (error) {
            console.log(error);
        } else {
            aToken = accessToken;
            aTokenSecret = accessTokenSecret;
            req.session.aToken = accessToken;
            req.session.aTokenSecret = accessTokenSecret;
            res.render('tweet.ejs',{
                tweetContent: req.session.tweetContent
            });
        }
    });
});

router.post('/update', upload.single('my_file'), function(req, res, next) {
    var sess = req.session;
    var result = '';
    if(req.file !== undefined) {
        twitter.uploadMedia({
                media: req.file.path,
                isBase64: false
            },
            sess.aToken,
            sess.aTokenSecret,
            function(error, data) {
                if (error) {
                    result = "Upload failed. Please try later : "+ error; 
                    res.render('status.ejs',{
                        status: result
                    });
                } else {
                    fs.unlink(req.file.path);
                    twitter.statuses("update", {
                            status: req.body.tweetContent,
                            media_ids: data.media_id_string
                        },
                        sess.aToken,
                        sess.aTokenSecret,
                        function(error, data) {
                            if (error) {
                                result = "Tweet failed. Please try later : "+ error; 
                            } else {
                                result = "Tweet Success!";
                            }
                            res.render('status.ejs',{
                                status: result
                            });
                    });
                }
        });
    }else {
        twitter.statuses("update", {
                status: req.body.tweetContent
            },
            sess.aToken,
            sess.aTokenSecret,
            function(error, data) {
                if (error) {
                    result = "Tweet failed. Please try later : "+ error; 
                } else {
                    result = "Tweet Success!";
                }
                res.render('status.ejs',{
                    status: result
                });
        });
    }
    

});

module.exports = router; //mising this will show "requires middleware function but got a ' + gettype(fn));" 
