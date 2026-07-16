insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site-assets', 'site-assets', true, 10485760, array['image/png','image/jpeg','image/jpg','image/webp','image/gif','image/svg+xml'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

create policy "Public read site-assets"
on storage.objects for select
using (bucket_id = 'site-assets');

create policy "Public upload site-assets"
on storage.objects for insert
with check (bucket_id = 'site-assets');

create policy "Public update site-assets"
on storage.objects for update
using (bucket_id = 'site-assets');

create policy "Public delete site-assets"
on storage.objects for delete
using (bucket_id = 'site-assets');