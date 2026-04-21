create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  paddle_subscription_id text not null,
  paddle_customer_id text not null,
  product_id text not null,
  price_id text not null,
  status text not null,
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  environment text not null check (environment in ('sandbox','live')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, environment)
);

create index subscriptions_paddle_sub_idx on public.subscriptions(paddle_subscription_id);

alter table public.subscriptions enable row level security;

create policy "Users can view their own subscriptions"
  on public.subscriptions for select
  to authenticated
  using (auth.uid() = user_id);

create or replace function public.has_active_subscription(_user_id uuid, _check_env text default 'live')
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.subscriptions
    where user_id = _user_id
      and environment = _check_env
      and status in ('active','trialing')
      and (current_period_end is null or current_period_end > now())
  );
$$;