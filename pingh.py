import os
import time

def ping_host(host, count, interval):
    for i in range(count):
        response = os.system(f"ping -c 1 {host}")
        if response == 0:
            print(f"Ping {i+1}: {host} is up!")
        else:
            print(f"Ping {i+1}: {host} is down!")
        time.sleep(interval)

if __name__ == "__main__":
    host_to_ping = "192.168.188.101"  # replace with the desired host
    number_of_pings = 200
    interval_in_seconds = 5
    
    ping_host(host_to_ping, number_of_pings, interval_in_seconds)
