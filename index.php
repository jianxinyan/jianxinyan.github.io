<?php
    header("Content-type: application/json");

    $req = $_GET["req"];
    
    if($req == "all"){
        
    } else{
        getOne($req);
    }
    
    function getOne($type){
        $post = glob("data/".$type."/post*");
        $output;
        foreach ($post as $path){
            $contents = glob($path."/*");
            if($type == "tt"){
                $picture = "none";
                $profile = $contents[1];
            } else{
                $picture = $contents[1];
                $profile = $contents[2];
            }
            $info = $contents[0];
            $info = file($info);
            $postType = trim($info[4]);
            $info = ["name"=>trim($info[0]),"handle"=>trim($info[1]),"date"=>trim($info[2]),"postText"=>trim($info[3])];
            $output[] = ["picture"=>$picture,"profile"=>$profile,"info"=>$info, "zpostType"=>$postType];
        }
        shuffle($output);
        echo json_encode($output);
    }
    

    
?>