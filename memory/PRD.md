# SCF Platform - Product Requirements Document

## Original Problem Statement
Build a UI prototype for a financial (Supply Chain Finance) application with three distinct user flows:
1. **Anchor Maker Flow:** View invoices, raise new invoices
2. **Anchor Checker Flow:** View invoices raised by Maker, approve or reject them
3. **Channel Partner Admin Flow:** View lead statuses, active channel partners, approve invoices as final step, view repayment ledger

## Users & Credentials
| Role | Email | Password | OTP |
|------|-------|----------|-----|
| Anchor Maker | ramesh@tatamotors.com | password | 000000 |
| Anchor Checker | suresh@tatamotors.com | password | 000000 |
| Channel Partner Admin | ganga@jagdambamotors.com | password | 000000 |

## Invoice Status Flow
`pending_checker_approval` → `approved_l1` (Checker) → `fully_approved` (CP Admin)
Rejection: `rejected_checker` (by Checker) or `rejected_cp` (by CP Admin)

## Tech Stack
- **Frontend:** React, React Router, Tailwind CSS, shadcn/ui
- **Backend:** FastAPI (Python)
- **Database:** MongoDB
- **Auth:** JWT-based with OTP verification

## Architecture
```
/app/
├── backend/
│   ├── server.py          # All API routes
│   ├── tests/             # Pytest tests
│   └── .env               # MONGO_URL, DB_NAME
└── frontend/
    └── src/
        ├── App.js         # Router + role-based protected routes
        ├── contexts/AuthContext.js
        ├── components/Layout.js   # Sidebar + header
        ├── pages/maker/           # Dashboard, Invoices, Programs, Lenders
        ├── pages/checker/         # Dashboard, Invoices, ChannelPartners
        └── pages/channelPartner/  # Dashboard, Invoices, ChannelPartners, Repayment
```

## API Endpoints
- `POST /api/auth/login` - Login
- `POST /api/auth/verify-otp` - OTP verification
- `GET /api/invoices` - List invoices (role-filtered)
- `POST /api/invoices` - Create invoice (Maker only)
- `GET /api/invoices/{id}` - Invoice details
- `PUT /api/invoices/{id}/status` - Approve/reject invoice
- `GET /api/stats` - Dashboard stats
- `GET /api/programs` - Program list
- `GET /api/channel-partners` - Channel partner list
- `GET /api/repayment` - Repayment ledger

## What's Implemented (Feb 2026)
- [x] Login & OTP authentication with role-based routing
- [x] Anchor Maker: Dashboard, Programs, Invoices (list + raise), Lenders
- [x] Anchor Checker: Dashboard, Invoices (list + approve/reject), Channel Partners
- [x] Channel Partner Admin: Dashboard, Invoices (final approval), Channel Partners (with detail modal), Repayment Ledger
- [x] Dynamic invoice data with MongoDB
- [x] Role-based access control (Maker raises, Checker L1 approves, CP final approves)
- [x] CP limit display in invoice detail for Checker and CP Admin
- [x] Comprehensive test suite (31 backend tests, all passing)

## Backlog / Future Tasks
- [ ] P2: Refactor auth logic into centralized hook
- [ ] P2: Add pagination for invoice lists
- [ ] P2: Add export/download functionality for reports
- [ ] P3: Mobile responsive layout improvements
