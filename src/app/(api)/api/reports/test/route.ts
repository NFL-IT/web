import db from "@/db/index"
import { reportsTable } from "@/db/schema"

export const GET = async () => {
    await db.insert(reportsTable).values([
        {
            interface: "eth0",
            ip_address: "192.168.1.1",
            mac_address: "00:00:00:00:00:00",
            type: "port",
            protocol: "TCP",
            result: {
                80: "open",
                443: "closed"
            },
            status: "bad",
        },
        {
            interface: "ens33",
            ip_address: "192.168.2.55",
            mac_address: "FF:FF:FF:FF:FF:FF",
            type: "device",
            protocol: "TCP",
            result: [
                {
                    ip: "192.168.2.59",
                    mac: "FF:FF:FF:00:00:00",
                },
                {
                    ip: "192.168.2.67",
                    mac: "FF:FF:FF:00:00:01",
                }
            ],
            status: "good"
        },
    ]);

    return Response.json({ message: "Test data inserted" });
    // await db.insert(portReportsTable).values({
    //     interface: "eth0",
    //     ip_address: "192.168.1.1",
    //     protocol: "ICMP",
    //     status: "open",
    //     report_id: dev1.
    // })
}