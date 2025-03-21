import { Handler } from '@netlify/functions'

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const report = JSON.parse(event.body || '{}')
    
    // Log the CSP violation
    console.error('CSP Violation:', {
      timestamp: new Date().toISOString(),
      'csp-report': report
    })

    // You could also send this to a monitoring service
    // await sendToMonitoringService(report)

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'CSP violation logged' })
    }
  } catch (error) {
    console.error('Error processing CSP report:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' })
    }
  }
} 