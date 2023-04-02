<?php

$res = [
    [
        "ID" => "Workspace",
        "Name" => "Workspace",
        "BackgroundImage" => "",
        "ShowSlideShow" => "",
        "IdleTime" => 10,
        "SlideDuration" => 0,
        "UseTemplate4X5" => 0,
        "Template4X5ColumnHeaders" => 0,
        "UseCircularTheme" => 1,
        "BackgroundColor" => "green",
        "DefaultWorkspace" => 1,
    ],
    [
        "ID" => "P2",
        "Name" => "Page 2",
        "BackgroundImage" => "",
        "ShowSlideShow" => "",
        "IdleTime" => 10,
        "SlideDuration" => 0,
        "UseTemplate4X5" => 0,
        "Template4X5ColumnHeaders" => 0,
        "UseCircularTheme" => 1,
        "BackgroundColor" => "blue",
        "DefaultWorkspace" =>0,
    ]
];

header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:*');
header('Content-type:application/json');
print_r(json_encode($res));
