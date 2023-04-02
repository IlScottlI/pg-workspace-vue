<?php
$res = [
    [
        "ID" => "Office",
        "ParentID" => "Oshkosh",
        "Name" => "Office 365",
        "BackgroundImage" => "",
        "BackgroundIcon" => "none",
        "BackgroundColorClass" => "primary",
        "TileSize" => 100,
        "ExternalLink" => "https://office.com/?auth=2",
        "Display" => 1,
        "IsVisible" => 1,
        "DisplayInSlideShow" => 1,
        "BackgroundColorHex" => "green",
        "DisplayInNavbar" => 1,
        "DisplayInFooter" => 1,
        "PageParentID" => "P1"
    ],
    [
        "ID" => "T2",
        "ParentID" => "G1",
        "Name" => "Title",
        "BackgroundImage" => "",
        "BackgroundIcon" => "none",
        "BackgroundColorClass" => "primary",
        "TileSize" => 400,
        "ExternalLink" => "https://tablerstation.us",
        "Display" => 1,
        "IsVisible" => 1,
        "DisplayInSlideShow" => 0,
        "BackgroundColorHex" => "orange",
        "DisplayInNavbar" => 0,
        "DisplayInFooter" => 1,
        "PageParentID" => "G1"
    ]
];
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:*');
header('Content-type:application/json');
print_r(json_encode($res));
