<?php
$url = $_GET['url'];
$response = @file_get_contents($url);
if ($response !== false) {
    echo json_encode(['status' => 'up']);
} else {
    echo json_encode(['status' => 'down']);
}
?>
