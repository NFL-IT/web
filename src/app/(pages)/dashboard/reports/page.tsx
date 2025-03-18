export const dynamic = 'force-dynamic';

import db from '@/db/index'
import React from 'react'

const ReportsPage = async () => {
  const reports = await db.query.reportsTable.findMany();

  return (
    <table className="w-full border-collapse text-sm m-0 p-0 h-0">
      <thead>
        <tr className="border-b h-10 text-lg">
          <th className="px-3 py-1 text-left">ID</th>
          <th className="px-3 py-1 text-left">Interface</th>
          <th className="px-3 py-1 text-left">IP Address</th>
          <th className="px-3 py-1 text-left">MAC Address</th>
          <th className="px-3 py-1 text-left">Type</th>
          <th className="px-3 py-1 text-left">Protocol</th>
          <th className="px-3 py-1 text-left">Result</th>
          <th className="px-3 py-1 text-left">Date</th>
        </tr>
      </thead>
      <tbody>
        {reports.map((report) => {
          const date = new Date(report.timestamp * 1000);
          return (
          <tr key={report.id} className="border-b">
            <td className="px-3 py-1">{report.id}</td>
            <td className="px-3 py-1">{report.interface}</td>
            <td className="px-3 py-1">{report.ip_address}</td>
            <td className="px-3 py-1 text-sm">{report.mac_address}</td>
            <td className="px-3 py-1">{report.type}</td>
            <td className="px-3 py-1">{report.protocol}</td>
            <td className="px-3 py-1">{report.status}</td>
            <td className="px-3 py-1">{date.toLocaleString("fr-FR")}</td>
          </tr>
        
  )})}
      </tbody>
    </table>
  );
};

export default ReportsPage;
