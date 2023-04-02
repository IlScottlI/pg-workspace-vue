<?php



$res = [
    [
        "ID" => "Safety",
        "ParentID" => "Workspace",
        "Name" => "Safety",
        "TileSize" => 100,
        "Display" => 1,
        "IsVisible" => 1,
        "DisplayInSlideShow" => 1,
        "BackgroundColorHex" => "darkgreen",
        "DisplayInNavbar" => 1,
        "DisplayInFooter" => 1,
        "PageParentID" => "Workspace",
        "DefaultWorkspace" => 1,
    ],
    [
        "ID" => "Quality",
        "ParentID" => "Workspace",
        "Name" => "Quality",
        "TileSize" => 100,
        "Display" => 1,
        "IsVisible" => 1,
        "DisplayInSlideShow" => 1,
        "BackgroundColorHex" => "red",
        "DisplayInNavbar" => 1,
        "DisplayInFooter" => 1,
        "PageParentID" => "Workspace"
    ],
    [
        "ID" => "Production",
        "ParentID" => "Workspace",
        "Name" => "Production",
        "TileSize" => 100,
        "Display" => 1,
        "IsVisible" => 1,
        "DisplayInSlideShow" => 1,
        "BackgroundColorHex" => "blue",
        "DisplayInNavbar" => 1,
        "DisplayInFooter" => 1,
        "PageParentID" => "Workspace"
    ],
    [
        "ID" => "Inventory",
        "ParentID" => "Workspace",
        "Name" => "Inventory",
        "TileSize" => 100,
        "Display" => 1,
        "IsVisible" => 1,
        "DisplayInSlideShow" => 1,
        "BackgroundColorHex" => "#f35c10",
        "DisplayInNavbar" => 1,
        "DisplayInFooter" => 1,
        "PageParentID" => "Workspace"
    ],
    [
        "ID" => "Oshkosh",
        "ParentID" => "Workspace",
        "Name" => "Oshkosh",
        "TileSize" => 100,
        "Display" => 1,
        "IsVisible" => 1,
        "DisplayInSlideShow" => 1,
        "BackgroundColorHex" => "#f1a945",
        "DisplayInNavbar" => 1,
        "DisplayInFooter" => 1,
        "PageParentID" => "Workspace"
    ]
];

header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:*');
header('Content-type:application/json');
print_r(json_encode($res));