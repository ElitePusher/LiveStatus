<?php
$services = [
    ['name' => 'Website', 'ip' => '', 'port' => 80],
    ['name' => 'DDoS Protection', 'ip' => '', 'port' => 80],
    ['name' => 'MySQL Server', 'ip' => '', 'port' => 80],
    ['name' => 'Link Website', 'ip' => '', 'port' => 80]
];

$serviceStatus = [];

foreach ($services as $service) {
    $fp = @fsockopen($service['ip'], $service['port'], $errno, $errstr, 0.1);
    if ($fp !== false) {
        $serviceStatus[] = ['name' => $service['name'], 'status' => 'up'];
        fclose($fp);
    } else {
        $serviceStatus[] = ['name' => $service['name'], 'status' => 'down', 'error' => ['code' => $errno, 'message' => $errstr]];
    }
}

echo json_encode($serviceStatus);
?>
